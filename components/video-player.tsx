"use client"

import { useState } from "react"
import { X, Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl: string
  title: string
  category?: string
  provider?: "youtube" | "vimeo" | "custom"
}

export function VideoPlayer({ 
  videoUrl, 
  thumbnailUrl, 
  title, 
  category,
  provider = "youtube" 
}: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Extract video ID from URL
  const getEmbedUrl = () => {
    if (provider === "youtube") {
      const videoId = videoUrl.includes("youtu.be") 
        ? videoUrl.split("/").pop()?.split("?")[0]
        : new URLSearchParams(new URL(videoUrl).search).get("v")
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    } else if (provider === "vimeo") {
      const videoId = videoUrl.split("/").pop()
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    return videoUrl
  }

  return (
    <>
      {/* Thumbnail with Play Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500">
              <Play className="ml-1 h-8 w-8 fill-black text-black transition-colors duration-300 group-hover:fill-white group-hover:text-white" />
            </div>
          </div>

          {/* Title and Category */}
          {(title || category) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between gap-4">
                {title && (
                  <h3 className="text-lg font-semibold text-white font-inter-tight">
                    {title}
                  </h3>
                )}
                {category && (
                  <span className="text-xs text-white border border-white rounded-full px-4 py-1 font-sora whitespace-nowrap">
                    {category}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Video Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="max-w-5xl w-full p-0 bg-black border-gray-800"
          showCloseButton={false}
        >
          <div className="relative w-full">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Video embed */}
            <div className="relative aspect-video w-full">
              <iframe
                src={getEmbedUrl()}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Simple version without modal - just thumbnail with link
interface SimpleVideoLinkProps {
  videoUrl: string
  thumbnailUrl: string
  title: string
  category?: string
}

export function SimpleVideoLink({ 
  videoUrl, 
  thumbnailUrl, 
  title, 
  category 
}: SimpleVideoLinkProps) {
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          loading="lazy"
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500">
            <Play className="ml-1 h-8 w-8 fill-black text-black transition-colors duration-300 group-hover:fill-white group-hover:text-white" />
          </div>
        </div>

        {(title || category) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between gap-4">
              {title && (
                <h3 className="text-lg font-semibold text-white font-inter-tight">
                  {title}
                </h3>
              )}
              {category && (
                <span className="text-xs text-white border border-white rounded-full px-4 py-1 font-sora whitespace-nowrap">
                  {category}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </a>
  )
}
