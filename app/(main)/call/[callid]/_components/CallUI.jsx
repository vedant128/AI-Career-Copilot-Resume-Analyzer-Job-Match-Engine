"use client";

import { useEffect, useCallback, useState } from "react";
import { toast } from "sonner";

// Stream Video
import {
    StreamTheme,
    SpeakerLayout,
    useCallStateHooks,
    useCall,
    CallingState,
    CallControls,
    RecordCallButton,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// Stream Chat
import {
    Chat,
    Channel,
    MessageList,
    MessageComposer,
    Window,
    useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles, Loader2 } from "lucide-react";
import AIQuestionsPanel from "./AIQuestions";

// ─── Call UI (inside StreamCall context) ─────────────────────────────────────

export default function CallUI({
    callId,
    isInterviewer,
    booking,
    onLeave,
    apiKey,
    token,
    currentUser,
}) {
    const { useCallCallingState } = useCallStateHooks();
    const call = useCall();
    const callingState = useCallCallingState();

    useEffect(() => {
        console.log("CallUI Context:", {
            callId,
            isInterviewer,
            currentUserId: currentUser.id,
            bookingInterviewerId: booking.interviewer.clerkUserId
        });
    }, [callId, isInterviewer, currentUser.id, booking.interviewer.clerkUserId]);

    const [isRecording, setIsRecording] = useState(false);

    // Subscribe to call recording state
    useEffect(() => {
        if (!call) return;
        const sub = call.state.recording$.subscribe((rec) =>
            setIsRecording(!!rec)
        );
        return () => sub.unsubscribe();
    }, [call]);

    const [activeTab, setActiveTab] = useState("chat");
    const [recordingLoading, setRecordingLoading] = useState(false);

    const handleToggleRecording = useCallback(async () => {
        if (!call || recordingLoading) return;
        setRecordingLoading(true);
        try {
            if (isRecording) {
                await call.stopRecording();
                toast.success("Recording stopped");
            } else {
                await call.startRecording();
                toast.success("Recording started");
            }
        } catch (err) {
            console.error("Recording toggle failed:", err);
            toast.error("Failed to toggle recording");
        } finally {
            setRecordingLoading(false);
        }
    }, [call, isRecording, recordingLoading]);

    // Auto-stop recording before leaving
    const handleLeave = useCallback(async () => {
        try {
            if (call) {
                if (isRecording) {
                    await call.stopRecording().catch(() => { });
                }
                await call.leave().catch(() => { });
            }
        } finally {
            onLeave();
        }
    }, [call, isRecording, onLeave]);

    // ── Chat client — same token works for both Video + Chat SDKs ──
    const chatClient = useCreateChatClient({
        apiKey,
        tokenOrProvider: token,
        userData: {
            id: currentUser.id,
            name: currentUser.name,
            image: currentUser.imageUrl,
        },
    });

    const [chatChannel, setChatChannel] = useState(null);
    // Increment chatKey each time chatClient changes so the entire <Chat> tree
    // remounts fresh — prevents stale channel refs reaching MessageComposerProvider
    const [chatKey, setChatKey] = useState(0);
    useEffect(() => {
        if (chatClient) setChatKey((k) => k + 1);
    }, [chatClient]);

    useEffect(() => {
        if (!chatClient) return;

        let cancelled = false;

        const channel = chatClient.channel("messaging", callId, {
            name: "Interview Chat",
            members: [
                booking.interviewer.clerkUserId,
                booking.interviewee.clerkUserId,
            ],
        });

        channel
            .watch()
            .then(() => {
                if (!cancelled) setChatChannel(channel);
            })
            .catch((err) => {
                if (!cancelled) console.error(err);
            });

        return () => {
            cancelled = true;
            setChatChannel(null);
            channel.stopWatching().catch(() => { });
        };
    }, [chatClient, callId, booking]);

    if (callingState === CallingState.LEFT) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-3">
                <p className="text-stone-400 text-sm">Leaving call…</p>
            </div>
        );
    }

    return (
        <div className="min-h-[92vh] bg-[#0a0a0b] flex flex-col overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0">
                <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className="border-white/10 text-stone-500 text-xs"
                    >
                        {booking.interviewer.name}
                        <span className="text-stone-700 mx-1.5">×</span>
                        {booking.interviewee.name}
                    </Badge>
                    {isInterviewer ? (
                        <Badge
                            variant="outline"
                            className="border-amber-400/20 bg-amber-400/5 text-amber-400 text-xs"
                        >
                            Interviewer
                        </Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="border-white/10 text-stone-500 text-xs"
                        >
                            Interviewee
                        </Badge>
                    )}
                </div>

                {/* Recording Status Indicator — visible to everyone when recording */}
                {isRecording && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] font-medium text-red-400 uppercase tracking-wider">
                            Recording In Progress
                        </span>
                    </div>
                )}

                {/* Record button — interviewer only */}
                {isInterviewer && (
                    <button
                        type="button"
                        onClick={handleToggleRecording}
                        disabled={recordingLoading}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                            isRecording
                                ? "border-red-500/40 bg-red-500/10 text-red-400 animate-pulse"
                                : "border-white/10 text-stone-400 hover:border-white/20 hover:text-stone-200"
                        } disabled:opacity-50`}
                    >
                        {recordingLoading ? (
                            <Loader2 size={12} className="animate-spin" />
                        ) : (
                            <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-500" : "bg-stone-600"}`} />
                        )}
                        {isRecording ? "Stop Recording" : "Start Recording"}
                    </button>
                )}
            </div>

            {/* Body: video + side panel */}
            <div className="flex flex-1 min-h-0">
                {/* ── LEFT: Video ── */}
                <div className="flex flex-col flex-1 min-w-0">
                    <StreamTheme>
                        <SpeakerLayout participantBarPosition="bottom" />
                        <div className="flex flex-col items-center gap-4 py-4 bg-[#0a0a0b] border-t border-white/5">
                            <div className="flex items-center gap-6">
                                <CallControls onLeave={handleLeave} />
                                {isInterviewer && (
                                    <div className="flex items-center gap-2 px-4 border-l border-white/10">
                                        <RecordCallButton />
                                        <span className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">
                                            {isRecording ? "Stop" : "Record"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </StreamTheme>
                </div>

                {/* ── RIGHT: Chat / AI panel ── */}
                <div className="w-85 shrink-0 flex flex-col border-l border-white/8 bg-[#0a0a0b]">
                    {/* Tab switcher */}
                    <div className="flex border-b border-white/8 shrink-0">
                        <button
                            type="button"
                            onClick={() => setActiveTab("chat")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${activeTab === "chat"
                                ? "text-amber-400 border-b-2 border-amber-400"
                                : "text-stone-500 hover:text-stone-300"
                                }`}
                        >
                            <MessageSquare size={13} />
                            Chat
                        </button>

                        {/* AI Questions tab — interviewer only */}
                        {isInterviewer && (
                            <button
                                type="button"
                                onClick={() => setActiveTab("ai")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium transition-colors ${activeTab === "ai"
                                    ? "text-amber-400 border-b-2 border-amber-400"
                                    : "text-stone-500 hover:text-stone-300"
                                    }`}
                            >
                                <Sparkles size={13} />
                                AI Questions
                            </button>
                        )}
                    </div>

                    {/* Panel content */}
                    <div className="flex-1 min-h-0 overflow-hidden">
                        {activeTab === "chat" ? (
                            chatClient && chatClient.userID && chatChannel ? (
                                <Chat key={chatKey} client={chatClient} theme="str-chat__theme-dark">
                                    <Channel channel={chatChannel}>
                                        <Window>
                                            <MessageList />
                                            <MessageComposer focus />
                                        </Window>
                                    </Channel>
                                </Chat>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 size={18} className="text-stone-600 animate-spin" />
                                </div>
                            )
                        ) : (
                            <div className="p-4 h-full overflow-y-scroll max-h-screen">
                                <AIQuestionsPanel categories={booking.categories} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}