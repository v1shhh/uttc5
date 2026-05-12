import React, { useState } from 'react';

interface InstagramEmbedProps {
  postUrl: string;
  caption?: string;
}

/**
 * Simple Instagram post embed component
 * No OAuth needed - uses Instagram's public embed API
 *
 * Usage:
 * <InstagramEmbed postUrl="https://www.instagram.com/p/POST_ID/" />
 */
export function InstagramEmbed({ postUrl, caption }: InstagramEmbedProps) {
  return (
    <div style={{ maxWidth: '540px', margin: '0 auto' }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: 'calc(100% - 2px)',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={postUrl}
            style={{
              background: '#FFFFFF',
              lineHeight: 0,
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View this post on Instagram
          </a>
        </div>
      </blockquote>
      {caption && (
        <p style={{ textAlign: 'center', color: 'var(--color-text-dim)', fontSize: '14px', marginTop: '1rem' }}>
          {caption}
        </p>
      )}
    </div>
  );
}

/**
 * Instagram Gallery Component
 * Displays multiple Instagram posts in a grid
 *
 * Usage:
 * <InstagramGallery posts={[
 *   { url: "https://www.instagram.com/p/POST_ID_1/", caption: "Pool project 1" },
 *   { url: "https://www.instagram.com/p/POST_ID_2/", caption: "Pool project 2" }
 * ]} />
 */
interface InstagramPost {
  url: string;
  caption?: string;
}

export function InstagramGallery({ posts }: { posts: InstagramPost[] }) {
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    // Load Instagram embed script
    if (!loaded) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        setLoaded(true);
        // Process embeds after script loads
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else {
      // Re-process embeds if already loaded
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    }
  }, [posts]);

  return (
    <div style={{ padding: 'var(--space-xl) 0' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          Our Latest Projects on Instagram
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {posts.map((post, index) => (
            <InstagramEmbed key={index} postUrl={post.url} caption={post.caption} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Example usage in a page:
 *
 * import { InstagramGallery } from '@/components/ui/InstagramEmbed';
 *
 * const instagramPosts = [
 *   {
 *     url: "https://www.instagram.com/p/ABC123/",
 *     caption: "Luxury infinity pool at Jumeirah Beach"
 *   },
 *   {
 *     url: "https://www.instagram.com/p/DEF456/",
 *     caption: "Water feature installation at Emirates Palace"
 *   },
 *   {
 *     url: "https://www.instagram.com/p/GHI789/",
 *     caption: "Rooftop pool project in Dubai Marina"
 *   }
 * ];
 *
 * <InstagramGallery posts={instagramPosts} />
 */

export default InstagramEmbed;
