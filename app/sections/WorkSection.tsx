"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LoadingWrapper } from "@/components/loading-wrapper"
import { useState, useEffect, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDialog } from "@/contexts/dialog-context"

interface Project {
  title: string
  category: string
  thumbnail: string
  videoUrl?: string
  client?: string
  director?: string
  description?: string
  type?: "audio" | "design"
}

const audioProjects: Project[] = [
  
  {
    title: 'Chelsea Collins | "Hotel Bed" (feat. Swae Lee)',
    category: "Music Video",
    thumbnail: "/work-thumbnails/Swae_Lee.jpg",
    videoUrl: "https://www.youtube.com/embed/yzwsXIwwq-k",
    client: "Hitco Entertainment",
    director: "Krizia Vega",
  },
  {
    title: "POPSocial life | Lala Kent",
    category: "Commercial",
    thumbnail: "/work-thumbnails/POPSocial_3.jpg",
    videoUrl: "https://www.youtube.com/embed/hNXkcCQy2jg",
    client: "POPSocial",
    director: "Krizia Vega",
  },
  {
    title: "The CarBlip Way",
    category: "Commercial",
    thumbnail: "/work-thumbnails/CarBlip.jpg",
    videoUrl: "https://www.youtube.com/embed/dFs0u1-vZi4",
    client: "CarBlip",
    director: "Avi Richards",
  },
  {
    title: "7 Days - Make a Difference | Tomchei LA",
    category: "Commercial",
    thumbnail: "/work-thumbnails/7_Days.jpg",
    videoUrl: "https://www.youtube.com/embed/AO5FGAkh5vk",
    client: "Tomchei LA",
    director: "Mo Weiss",
  },
  {
    title: 'Alejandro Aranda | Home',
    category: "Music Video",
    thumbnail: "/work-thumbnails/Home.jpg",
    videoUrl: "https://www.youtube.com/embed/HW1g8qRM6HE",
    client: "Hollywood Records, Inc",
    director: "Krizia Vega",
  },
  {
    title: "JETS | We're Never Really Ready",
    category: "Commercial",
    thumbnail: "/work-thumbnails/JETS.jpg",
    videoUrl: "https://www.youtube.com/embed/xx2vQoyhzzw",
    client: "JETS",
    director: "Krizia Vega",
  },
  {
    title: "Subaru | Forester",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Subaru.jpg",
    videoUrl: "https://www.youtube.com/embed/fCR4DxRjUTs",
    client: "Subaru",
    director: "Krizia Vega",
  },
  {
    title: "Step x Bugha",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Step_X_Bugha.jpg",
    videoUrl: "https://www.youtube.com/embed/ZIsiMDOULLU",
    client: "Step Mobile",
    director: "Krizia Vega",
  },
  {
    title: "Tomchei LA's End of the Year Campaign",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Tomchei_LA_Year_2.jpg",
    videoUrl: "https://www.youtube.com/embed/ZA8jj7I4FOw",
    client: "Tomchei LA",
    director: "Avi Richards",
  },
  {
    title: "The Shape Of Shadows | Experimental",
    category: "Film",
    thumbnail: "/work-thumbnails/The_Shape_Of_Shadows.jpg",
    videoUrl: "https://www.youtube.com/embed/xk4wrzzHMLU",
    client: "Upside Down LA",
    director: "Julia Elihu",
  },
  {
    title: "Bilo jednom u Srbiji | Feature",
    category: "Film",
    thumbnail: "/work-thumbnails/Bilo_jednom_Srbiji_2.jpg",
    videoUrl: "https://www.youtube.com/embed/5t6OKnULAUI",
    client: "Le Film",
    director: "Petar Ristovski",
  },
  {
    title: "Nebesko | Feature",
    category: "Film",
    thumbnail: "/work-thumbnails/Nebesko.jpg",
    videoUrl: "https://www.youtube.com/embed/g_p4kd_ebt0",
    client: "Svetlobor",
    director: "Mario Glamazić",
  },
  {
    title: "Rum Kasato | Tek mi je 30!",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Rum_Kasato_2.jpg",
    videoUrl: "https://www.youtube.com/embed/7B601zgAMKM",
    client: "DME Video",
    director: "DME Video Team",
  },
  {
    title: "Polovni Automobili | 01",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Polovni_1.jpg",
    videoUrl: "https://www.youtube.com/embed/NUhfSsD9vVA",
    client: "DME Video",
    director: "DME Video Team",
  },
  {
    title: "Polovni Automobili | 02",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Polovni_2.jpg",
    videoUrl: "https://www.youtube.com/embed/vQmK0mhaRO4",
    client: "DME Video",
    director: "DME Video Team",
  },
  {
    title: "Polovni Automobili | 03",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Polovni_3.jpg",
    videoUrl: "https://www.youtube.com/embed/f0lY4DoMuyQ",
    client: "DME Video",
    director: "DME Video Team",
  },
  {
    title: "BRAVO | Strawberry",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Bravo_Strawberry.jpg",
    videoUrl: "https://www.youtube.com/embed/LMgbe9vOaus",
    client: "Rauch",
    director: "DME Video Team",
  },
  {
    title: "BRAVO | Sunny Orange",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Bravo_Sunny.jpg",
    videoUrl: "https://www.youtube.com/embed/Ja7RgGkSCqY",
    client: "Rauch",
    director: "DME Video Team",
  },
  {
    title: "BRAVO | Green Apple",
    category: "Commercial",
    thumbnail: "/work-thumbnails/Bravo_GreenApple.jpg",
    videoUrl: "https://www.youtube.com/embed/JMsZ2_y7-sQ",
    client: "Rauch",
    director: "DME Video Team",
  },
]

const designProjects: Project[] = [
  {
    title: "Radnjeica Brand Identity",
    category: "Branding",
    thumbnail: "/design-thumbnails/design1.jpg",
    description: "Brand identity and visual design",
    type: "design",
  },
  {
    title: "Responsive Web Design",
    category: "Web Design",
    thumbnail: "/design-thumbnails/design2.jpg",
    description: "Modern responsive website design",
    type: "design",
  },
  {
    title: "Amazing Zing Website",
    category: "Web Design",
    thumbnail: "/design-thumbnails/design3.jpg",
    description: "Full website design and development",
    type: "design",
  },
  {
    title: "EXON Gaming Theme",
    category: "UI Design",
    thumbnail: "/design-thumbnails/design4.jpg",
    description: "Gaming platform UI/UX design",
    type: "design",
  },
  {
    title: "NLE Logistics Theme",
    category: "Web Design",
    thumbnail: "/design-thumbnails/design5.jpg",
    description: "Logistics company website design",
    type: "design",
  },
  {
    title: "Frequent Typography",
    category: "Typography",
    thumbnail: "/design-thumbnails/design6.jpg",
    description: "Typography and lettering design",
    type: "design",
  },
]

// Project Modal Component
function ProjectModal({ project }: { project: Project }) {
  return (
    <DialogContent className="max-w-6xl bg-black/60 backdrop-blur-3xl border-white/10 text-white p-5 rounded-3xl [&>button[data-slot=dialog-close]]:hidden [&>button[data-slot=dialog-close]]:md:flex">
      <DialogHeader>
        <DialogTitle className="text-xl font-inter-tight">{project.title}</DialogTitle>
        <DialogDescription className="text-gray-400 font-sora">
          {project.category}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* Video Player */}
        {project.videoUrl ? (
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
            <iframe
              src={project.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video rounded-xl overflow-hidden bg-gray-900">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Project Details */}
        <div className="space-y-3">
          <div>
            <dl className="space-y-2 font-sora">
              {project.client && (
                <div className="flex justify-between border-b border-gray-800 py-1.5">
                  <dt className="text-gray-400">Client</dt>
                  <dd className="text-white">{project.client}</dd>
                </div>
              )}
              {project.director && (
                <div className="flex justify-between border-b border-gray-800 py-1.5">
                  <dt className="text-gray-400">Directed by</dt>
                  <dd className="text-white">{project.director}</dd>
                </div>
              )}
              {project.type !== "design" && (
                <div className="flex justify-between border-b border-gray-800 py-1.5">
                  <dt className="text-gray-400">Sound Design & Mix</dt>
                  <dd className="text-white">Stevan Marinkovic</dd>
                </div>
              )}
            </dl>
          </div>

          {project.description && (
            <div>
              <h3 className="text-base font-semibold mb-2 font-inter-tight">About</h3>
              <p className="text-gray-300 font-sora">{project.description}</p>
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  )
}

export function WorkSection() {
  const { setDialogOpen } = useDialog()
  const [openDialogId, setOpenDialogId] = useState<string | null>(null)
  const [activeProjectType, setActiveProjectType] = useState<"audio" | "design">("audio")
  const [visibleCount, setVisibleCount] = useState(6)
  const [batchStartIndex, setBatchStartIndex] = useState(0)

  const currentProjects = activeProjectType === "audio" ? audioProjects : designProjects
  const visibleProjects = currentProjects.slice(1, visibleCount + 1)
  const hasMore = visibleCount + 1 < currentProjects.length

  const handleDialogChange = useCallback((open: boolean, dialogId: string) => {
    setDialogOpen(open)
    setOpenDialogId(open ? dialogId : null)
  }, [setDialogOpen])

  // Close dialog on scroll (wheel or touch move) and forward scroll to page
  useEffect(() => {
    if (!openDialogId) return

    const closeAndScroll = (deltaY: number) => {
      setDialogOpen(false)
      setOpenDialogId(null)
      requestAnimationFrame(() => {
        const mainEl = document.querySelector("main")
        if (mainEl) {
          mainEl.scrollBy({ top: deltaY, behavior: "smooth" })
        }
      })
    }

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) {
        closeAndScroll(e.deltaY * 3)
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = e.touches[0].clientY - touchStartY
      if (Math.abs(deltaY) > 10) {
        closeAndScroll(-deltaY * 3)
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [openDialogId, setDialogOpen])

  const loadMore = () => {
    setBatchStartIndex(visibleCount)
    setVisibleCount(prev => Math.min(prev + 6, currentProjects.length))
  }

  const switchProjectType = (type: "audio" | "design") => {
    setActiveProjectType(type)
    setVisibleCount(6)
    setBatchStartIndex(0)
  }

  return (
    <section id="work" className="min-h-screen snap-start scroll-mt-[45px] bg-black overflow-y-auto pt-[calc(3rem+40px)] pb-32">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <div className="max-w-[1800px] mx-auto">
          {/* Project Type Buttons */}
          <LoadingWrapper delay={100}>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
              <Button
                onClick={() => switchProjectType("audio")}
                className={`rounded-full px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-sm sm:text-base md:text-lg font-medium font-sora transition-all duration-300 ${
                  activeProjectType === "audio"
                    ? "text-white border border-purple-400 hover:bg-purple-500/20"
                    : "text-white border border-white bg-transparent hover:bg-purple-500/20 hover:border-purple-400 hover:text-white"
                }`}
                style={{ backgroundColor: activeProjectType === "audio" ? "#200F33" : "transparent" }}
              >
                Audio Projects
              </Button>
              <Button
                onClick={() => switchProjectType("design")}
                className={`rounded-full px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-sm sm:text-base md:text-lg font-medium font-sora transition-all duration-300 ${
                  activeProjectType === "design"
                    ? "text-white border border-purple-400 hover:bg-purple-500/20"
                    : "text-white border border-white bg-transparent hover:bg-purple-500/20 hover:border-purple-400 hover:text-white"
                }`}
                style={{ backgroundColor: activeProjectType === "design" ? "#200F33" : "transparent" }}
              >
                Design Projects
              </Button>
            </div>
          </LoadingWrapper>

          {/* Hero Project */}
          <LoadingWrapper delay={200}>
            <Dialog
              open={openDialogId === "hero"}
              onOpenChange={(open) => handleDialogChange(open, "hero")}
            >
              <DialogTrigger asChild>
                <button className="group block w-full text-left mb-8">
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={currentProjects[0].thumbnail}
                      alt="Featured Project"
                      width={1200}
                      height={600}
                      sizes="(max-width: 1280px) 100vw, 1200px"
                      className="w-full h-[300px] lg:h-[500px] xl:h-[600px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl sm:text-2xl font-semibold font-inter-tight text-white">
                          {currentProjects[0].title}
                        </h2>
                        <span className="text-sm text-white border border-white rounded-full px-3.5 py-0.5 font-sora shrink-0 bg-black/20 backdrop-blur-md">
                          {currentProjects[0].category}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <ProjectModal project={currentProjects[0]} />
            </Dialog>
          </LoadingWrapper>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {visibleProjects.map((project, index) => (
              <LoadingWrapper key={`${activeProjectType}-${index}`} delay={Math.max(0, index - batchStartIndex) * 150}>
                <Dialog
                  open={openDialogId === `${activeProjectType}-${index}`}
                  onOpenChange={(open) => handleDialogChange(open, `${activeProjectType}-${index}`)}
                >
                  <DialogTrigger asChild>
                    <button className="group block w-full text-left">
                      <div className="relative overflow-hidden rounded-2xl">
                        <Image
                          src={project.thumbnail || "/placeholder.svg"}
                          alt={project.title}
                          width={600}
                          height={400}
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="w-full h-[200px] lg:h-[350px] xl:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-base sm:text-lg font-semibold font-inter-tight text-white line-clamp-1">
                              {project.title}
                            </h3>
                            <span className="text-sm text-white border border-white rounded-full px-5 py-1 font-sora shrink-0 bg-black/20 backdrop-blur-md">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>
                  <ProjectModal project={project} />
                </Dialog>
              </LoadingWrapper>
            ))}
          </div>

          {/* View More Button */}
          {hasMore && (
            <LoadingWrapper delay={900}>
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-purple-500/20 hover:border-purple-400 hover:text-white rounded-full px-8 py-3 group font-sora font-medium text-sm flex items-center justify-center mx-auto transition-all duration-300"
                >
                  VIEW MORE
                </Button>
              </div>
            </LoadingWrapper>
          )}

          {/* All Projects Loaded Message */}
          {!hasMore && currentProjects.length > 6 && (
            <LoadingWrapper delay={900}>
              <div className="text-center">
                <p className="text-gray-400 font-sora text-sm">
                  All projects displayed
                </p>
              </div>
            </LoadingWrapper>
          )}
        </div>
      </div>
    </section>
  )
}
