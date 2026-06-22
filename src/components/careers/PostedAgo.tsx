"use client";

import { useState, useEffect } from 'react';
import { postedAgo } from '../../data/careers';

/**
 * Renders a relative "Posted X days ago" label.
 *
 * The value depends on the current time, which differs between the (static) server
 * render and the client — rendering it directly causes a hydration mismatch. So we
 * render nothing on the server and on the first client paint (they match), then fill
 * in the relative label after mount.
 */
const PostedAgo = ({ iso }: { iso: string }) => {
    const [text, setText] = useState('');
    useEffect(() => setText(postedAgo(iso)), [iso]);
    return <>{text}</>;
};

export default PostedAgo;
