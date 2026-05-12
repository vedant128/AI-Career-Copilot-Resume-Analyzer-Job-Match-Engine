import PageHeader from '@/components/reusables'
import React from 'react'
import ExploreGrid from './components/ExploreGrid'
import { getInterviewers } from '@/actions/explore';

export default async function ExplorePage() {
    const interviewers = await getInterviewers();

    return (
        <main className='min-h-screen bg-black text-white'>
            <PageHeader
                label="Explore"
                gray="Find your"
                green="expert interviewer"
                description="Browse senor engineers from top companies">

            </PageHeader>

            <div className='max-w-6xl mx-auto px-8 xl:px-0 py-10'>
                <ExploreGrid interviewers={interviewers}></ExploreGrid>
            </div>
        </main>
    )
}

