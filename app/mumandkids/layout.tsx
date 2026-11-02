import { Metadata } from 'next';
import Script from 'next/script';
import WhatsAppCart from "@/components/mumandkids/WhatsAppCart";

export const metadata: Metadata = {
  title: 'Mum And Kids Outfits',
  description: 'Beat inflation. Secure premium quality outfits for your kids with our Trusted Mums smart deposit system.',
  openGraph: {
    title: 'Mum And Kids Outfits | Lock Your Price Today',
    images: ['https://uicosmcxqztkxlldsiwq.supabase.co/storage/v1/object/public/daizlab-assets/ot-branding/1782277568460-pmy9f76yif.jpeg'],
  },
};

export default function MumAndKidsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#05070b] text-white">
      {/* Essential Schema for AI Interpretation Readiness */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", "name": "Mum And Kids Outfits" }) }} 
      />
      
      {/* The content of your pages */}
      {children}
      
      {/* GLOBAL INJECTION: Cart follows user on every page */}
      <WhatsAppCart />
      
      {/* Essential Meta Pixel initialization */}
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){...your pixel code...}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');`}
      </Script>
    </div>
  );
}
