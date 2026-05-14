import {
    Html,
    Body,
    Container,
    Text,
    Button,
    Hr,
    Heading,
} from "@react-email/components";

export function BookingConfirmationEmail({
    interviewerName,
    intervieweeName,
    startTime,
    joinUrl,
}) {
    return (
        <Html>
            <Body
                style={{
                    fontFamily: "sans-serif",
                    padding: "32px 16px",
                    backgroundColor: "#f9fafb",
                }}
            >
                <Container
                    style={{
                        maxWidth: "500px",
                        margin: "0 auto",
                        backgroundColor: "#ffffff",
                        padding: "40px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Heading style={{ color: "#059669", fontSize: "24px", margin: "0 0 20px" }}>
                        New Booking Confirmed!
                    </Heading>
                    
                    <Text style={{ fontSize: "16px", color: "#374151", lineHeight: "1.5" }}>
                        Hi <strong>{interviewerName}</strong>,
                    </Text>
                    
                    <Text style={{ fontSize: "16px", color: "#374151", lineHeight: "1.5" }}>
                        <strong>{intervieweeName}</strong> has booked an interview session with you.
                    </Text>

                    <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />

                    <Text style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 8px" }}>
                        <strong>When:</strong> {startTime}
                    </Text>

                    <Text style={{ fontSize: "16px", color: "#374151", margin: "24px 0 32px" }}>
                        Please join the meeting using the button below at the scheduled time.
                    </Text>

                    <Button
                        href={joinUrl}
                        style={{
                            backgroundColor: "#10b981",
                            color: "#ffffff",
                            fontSize: "16px",
                            fontWeight: "600",
                            padding: "12px 30px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            display: "inline-block",
                            textAlign: "center",
                        }}
                    >
                        Join Meeting →
                    </Button>

                    <Hr style={{ borderColor: "#e5e7eb", margin: "32px 0 24px" }} />
                    
                    <Text style={{ fontSize: "12px", color: "#9ca3af", textAlign: "center" }}>
                        MockMate — Prep better, together.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
