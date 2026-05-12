# Instagram Integration Guide

## Simple Instagram Embeds (No OAuth Required) ✅

### What Was Created

**File**: `client/src/components/ui/InstagramEmbed.tsx`

Two React components for displaying Instagram content:
1. `InstagramEmbed` - Single post embed
2. `InstagramGallery` - Grid of multiple posts

### How to Use

#### Step 1: Get Instagram Post URLs

1. Go to Instagram post you want to embed
2. Click "..." menu → "Copy link"
3. URL format: `https://www.instagram.com/p/POST_ID/`

#### Step 2: Add to Your Page

```tsx
import { InstagramGallery } from '@/components/ui/InstagramEmbed';

const instagramPosts = [
  {
    url: "https://www.instagram.com/p/ABC123/",
    caption: "Luxury infinity pool at Jumeirah Beach"
  },
  {
    url: "https://www.instagram.com/p/DEF456/",
    caption: "Water feature at Emirates Palace"
  },
  {
    url: "https://www.instagram.com/p/GHI789/",
    caption: "Rooftop pool in Dubai Marina"
  }
];

function ProjectsPage() {
  return (
    <div>
      {/* Your existing content */}

      <InstagramGallery posts={instagramPosts} />
    </div>
  );
}
```

#### Step 3: Add to Home Page (Example)

Edit `client/src/pages/Home.tsx`:

```tsx
import { InstagramGallery } from '../components/ui/InstagramEmbed';

// Add this array near the top
const featuredInstagramPosts = [
  {
    url: "https://www.instagram.com/p/YOUR_POST_1/",
    caption: "Recent pool project"
  },
  {
    url: "https://www.instagram.com/p/YOUR_POST_2/",
    caption: "Water feature installation"
  },
  {
    url: "https://www.instagram.com/p/YOUR_POST_3/",
    caption: "Luxury resort pool"
  }
];

// Add before the closing </div> in the return statement
<InstagramGallery posts={featuredInstagramPosts} />
```

### Features

✅ **No OAuth Required** - Uses Instagram's public embed API
✅ **No API Keys** - Works immediately, no setup
✅ **Responsive** - Adapts to mobile/desktop
✅ **Auto-loads** - Instagram script loads automatically
✅ **Grid Layout** - Displays multiple posts in grid
✅ **Captions** - Optional captions below each post

### Advantages

- **Zero configuration** - Just paste URLs
- **Always up-to-date** - Shows live Instagram content
- **Official Instagram styling** - Looks native
- **No rate limits** - Public embeds have no limits
- **No maintenance** - Instagram handles updates

### Limitations

- Shows Instagram branding (unavoidable with free embeds)
- Can't customize styling much (Instagram controls it)
- Requires posts to be public
- Loads external script (Instagram's embed.js)

---

## Alternative: Instagram Graph API (Advanced)

If you need more control (custom styling, private posts, automated feeds), use Instagram Graph API:

### Requirements

1. Meta Developer Account
2. Instagram Business Account
3. Facebook Page linked to Instagram
4. App Review approval from Meta

### Setup Steps

1. Create Meta App: https://developers.facebook.com/apps
2. Add Instagram Graph API product
3. Get Access Token
4. Submit for App Review (takes 1-2 weeks)

### Implementation (After Approval)

```typescript
// server/src/services/instagramService.ts
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

export async function getInstagramFeed(limit = 12) {
  const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.data; // Array of posts
}

// server/src/routes/instagram.ts
import { Router } from 'express';
import { getInstagramFeed } from '../services/instagramService.js';

const router = Router();

router.get('/feed', async (req, res) => {
  try {
    const posts = await getInstagramFeed(12);
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch Instagram feed' });
  }
});

export default router;
```

### Frontend Component

```tsx
// client/src/components/ui/InstagramFeed.tsx
import React, { useEffect, useState } from 'react';

export function InstagramFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/instagram/feed')
      .then(r => r.json())
      .then(d => {
        if (d.success) setPosts(d.data);
      });
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      {posts.map((post: any) => (
        <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer">
          <img src={post.media_url} alt={post.caption} style={{ width: '100%', borderRadius: '8px' }} />
        </a>
      ))}
    </div>
  );
}
```

---

## Recommendation

**Start with Simple Embeds** (already implemented):
- Zero setup time
- Works immediately
- No approval needed
- Perfect for showcasing 3-6 featured projects

**Upgrade to Graph API later** if you need:
- Automated feed updates
- Custom styling
- Private posts
- Analytics integration

---

## Quick Start (5 Minutes)

1. Find 3 Instagram posts you want to feature
2. Copy their URLs
3. Edit `client/src/pages/Home.tsx`
4. Add this before closing `</div>`:

```tsx
import { InstagramGallery } from '../components/ui/InstagramEmbed';

const posts = [
  { url: "https://www.instagram.com/p/POST_1/", caption: "Project 1" },
  { url: "https://www.instagram.com/p/POST_2/", caption: "Project 2" },
  { url: "https://www.instagram.com/p/POST_3/", caption: "Project 3" }
];

<InstagramGallery posts={posts} />
```

5. Done! Instagram posts now display on your site.

---

## Summary

✅ **Simple Instagram embeds implemented** - No OAuth, no API keys, works immediately
✅ **Component created** - `InstagramEmbed.tsx` ready to use
✅ **Documentation provided** - Step-by-step guide above
✅ **Alternative documented** - Graph API guide for advanced needs

**You can now display Instagram content on your site by just pasting URLs.**
