export type BlogPost = {
    slug: string;
    title: string;
    emoji: string;
    description: string;
    content: React.ReactNode;
};

export const blogPosts: BlogPost[] = [
    {
        slug: 'how-ai-is-revolutionizing-art-on-instagram',
        title: 'How AI Is Revolutionizing Art on Instagram',
        emoji: '🎨',
        description: 'AI is changing how artists create, share, and grow online.',
        content: (
            <>
                <p>Artificial Intelligence is changing how artists create, share, and grow online. Platforms like GrowArt AI now help artists connect their creativity with the perfect audience — instantly.</p>
                <h3 className="font-headline text-2xl pt-4">1. Smart Captions for Every Mood</h3>
                <p>AI understands trends, tone, and audience engagement — turning simple artwork into captivating posts that speak emotionally.</p>
                <h3 className="font-headline text-2xl pt-4">2. Perfect Hashtags in Seconds</h3>
                <p>Instead of guessing, GrowArt AI curates hashtags based on art style, color themes, and emotions — helping your posts reach the right audience faster.</p>
                <h3 className="font-headline text-2xl pt-4">3. More Time to Create</h3>
                <p>AI removes the stress of writing, allowing you to focus purely on art while your reach grows automatically.</p>
                <p className="font-bold text-center pt-4 text-xl">✨ In short: AI is not replacing creativity — it’s amplifying it. Try GrowArt AI today and experience the future of digital art promotion.</p>
            </>
        )
    },
    {
        slug: '5-tips-to-make-your-artwork-go-viral',
        title: '5 Tips to Make Your Artwork Go Viral with Captions & Hashtags',
        emoji: '🚀',
        description: 'Posting art online is easy — making it viral is where the magic happens.',
        content: (
            <>
                <p>Posting art online is easy — making it viral is where the magic happens. Here are five quick tips to help your art shine on Instagram:</p>
                <ol className="list-decimal space-y-4 pl-6">
                    <li><span className="font-bold">Use Emotionally Charged Captions</span> – People connect through feelings. Describe what your art expresses, not just what it shows.</li>
                    <li><span className="font-bold">Pick Niche Hashtags</span> – Mix popular ones (#artwork, #digitalartist) with niche tags (#moodyportraits, #pastelart).</li>
                    <li><span className="font-bold">Consistency Matters</span> – Post regularly, even once a week, to train the algorithm.</li>
                    <li><span className="font-bold">Engage Actively</span> – Reply to comments, share stories, and follow other artists.</li>
                    <li><span className="font-bold">Use GrowArt AI</span> – Generate caption and hashtag sets that match your artwork’s vibe in one click.</li>
                </ol>
                <p className="font-bold text-center pt-4 text-xl">⚡ Create, post, and let AI do the rest — only on GrowArt AI.</p>
            </>
        )
    },
    {
        slug: 'why-every-artist-should-use-ai-tools-in-2025',
        title: 'Why Every Artist Should Use AI Tools in 2025',
        emoji: '✨',
        description: '2025 is the year AI becomes every artist’s best collaborator.',
        content: (
            <>
                <p>2025 is the year AI becomes every artist’s best collaborator.</p>
                <h3 className="font-headline text-2xl pt-4">1. AI Saves Time</h3>
                <p>Instead of spending hours thinking of captions, let GrowArt AI handle that while you focus on your next masterpiece.</p>
                <h3 className="font-headline text-2xl pt-4">2. Boosts Discoverability</h3>
                <p>Smart hashtags bring your art to new audiences every day. You create — AI connects.</p>
                <h3 className="font-headline text-2xl pt-4">3. Levels the Playing Field</h3>
                <p>Even new artists can compete with big creators through smarter posting and consistent visibility.</p>
                <p className="font-bold text-center pt-4 text-xl">🚀 GrowArt AI empowers artists with automation, creativity, and growth — all for free. Start using it today and make your next post your biggest one yet!</p>
            </>
        )
    }
];
