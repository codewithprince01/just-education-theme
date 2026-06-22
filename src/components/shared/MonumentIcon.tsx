"use client";

import React, { useState, useEffect } from 'react';
import { 
    MapPin, Building2, Landmark, Cpu, BookOpen, Briefcase, Coffee, Mountain, Sun, Compass, TreePine, Snowflake, Map, Building
} from 'lucide-react';

export const getCityMonument = (slug: string) => {
    let specificTitles: string[] = [];
    let icon: React.ReactNode = <Building2 className="w-8 h-8" strokeWidth={1.5} />;
    let cleanName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

    switch (slug) {
        // Cities
        case 'delhi-ncr': specificTitles = ['Red Fort Delhi', 'India Gate']; cleanName = 'Delhi'; icon = <Landmark className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'bangalore': specificTitles = ['Vidhana Soudha Bangalore', 'Bangalore Palace']; cleanName = 'Bangalore'; icon = <Cpu className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'mumbai': specificTitles = ['Gateway of India Mumbai', 'Chhatrapati Shivaji Terminus']; cleanName = 'Mumbai'; icon = <Briefcase className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'pune': specificTitles = ['Shaniwar Wada Pune', 'Aga Khan Palace Pune']; cleanName = 'Pune'; icon = <BookOpen className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'hyderabad': specificTitles = ['Charminar', 'Charminar Hyderabad', 'Golconda Fort']; cleanName = 'Hyderabad'; icon = <Building className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'chennai': specificTitles = ['Marina Beach Chennai', 'Kapaleeshwarar Temple']; cleanName = 'Chennai'; icon = <Coffee className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'kolkata': specificTitles = ['Victoria Memorial Kolkata', 'Howrah Bridge']; cleanName = 'Kolkata'; icon = <Map className="w-8 h-8" strokeWidth={1.5} />; break;
        
        // Newly requested
        case 'nagpur': specificTitles = ['Deekshabhoomi Nagpur', 'Zero Mile Stone Nagpur']; cleanName = 'Nagpur'; icon = <MapPin className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'bhopal': specificTitles = ['Sanchi Stupa near Bhopal', 'Taj-ul-Masajid Bhopal', 'Upper Lake Bhopal']; cleanName = 'Bhopal'; icon = <MapPin className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'indore': specificTitles = ['Rajwada Indore', 'Lal Baag Palace Indore']; cleanName = 'Indore'; icon = <MapPin className="w-8 h-8" strokeWidth={1.5} />; break;
        
        // Regions
        case 'north-india': specificTitles = ['Taj Mahal', 'Golden Temple Amritsar']; cleanName = 'North India'; icon = <Mountain className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'south-india': specificTitles = ['Meenakshi Temple Madurai', 'Hampi Karnataka']; cleanName = 'South India'; icon = <Compass className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'north-east': specificTitles = ['Kaziranga National Park', 'Tawang Monastery']; cleanName = 'North East India'; icon = <TreePine className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'kashmir': specificTitles = ['Dal Lake Kashmir', 'Gulmarg']; cleanName = 'Kashmir'; icon = <Snowflake className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'west-india': specificTitles = ['Hawa Mahal Jaipur', 'Somnath temple']; cleanName = 'West India'; icon = <Sun className="w-8 h-8" strokeWidth={1.5} />; break;
        case 'central-india': specificTitles = ['Khajuraho Monuments', 'Sanchi Stupa']; cleanName = 'Central India'; icon = <MapPin className="w-8 h-8" strokeWidth={1.5} />; break;
    }

    const fallbacks = [
        `${cleanName} city images`,
        `${cleanName} Heritage sites`,
        `${cleanName} Historical places`,
        cleanName
    ];

    return { titles: [...specificTitles, ...fallbacks], icon };
};

export const MonumentIcon = ({ titles, fallbackIcon, className }: { titles: string[]; fallbackIcon: React.ReactNode; className?: string }) => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchImage = async () => {
            try {
                for (const t of titles) {
                    // 1. Try Wikimedia Commons Search API (best for keyword searches like "Red Fort Delhi")
                    const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(t)}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=400&format=json&origin=*`);
                    const data = await res.json();
                    const pages = data?.query?.pages;
                    
                    if (pages) {
                        const image = Object.values(pages)[0] as any;
                        if (image?.thumbnail?.source) {
                            if (isMounted) setImgUrl(image.thumbnail.source);
                            return;
                        }
                    }
                    
                    // 2. Fallback to Wikipedia Summary REST API
                    const fallbackRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(t)}`);
                    if (fallbackRes.ok) {
                        const fallbackData = await fallbackRes.json();
                        if (fallbackData?.thumbnail?.source) {
                            if (isMounted) setImgUrl(fallbackData.thumbnail.source);
                            return;
                        }
                    }
                }
                
                // If loop finishes without returning, trigger error state
                if (isMounted) setError(true);
            } catch (err) {
                console.error("Failed to fetch image for", titles, err);
                if (isMounted) setError(true);
            }
        };
        fetchImage();
        
        // Disable warning for missing dependency because we intentionally join array
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return () => { isMounted = false; };
    }, [titles.join(',')]);

    if (error || !imgUrl) {
        return (
            <div className={`flex items-center justify-center bg-blue-50/70 text-blue-900 ${className}`}>
                {fallbackIcon}
            </div>
        );
    }

    // Next/Image isn't used here as domain might vary wildly and isn't configured in next.config.js
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={imgUrl} alt={titles[0]} className={`object-cover ${className}`} />;
};
