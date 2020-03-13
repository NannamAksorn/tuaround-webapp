const NgvIcon = `
<svg id="{carElId}" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
    style="transform: rotate({bearing}deg);"
>
    <defs>
        <linearGradient y2="0" x2="1" y1="0" x1="0" id="svg_36">
            <stop offset="0" stop-color="#aad4ff"/>
            <stop offset="1" stop-opacity="1" stop-color="#56aaff"/>
        </linearGradient>
    </defs>
    <g>
        <title>background</title>
        <path fill="none" id="canvas_background" d="M0 0h1e2v1e2H0z"/>
        <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
            <path fill="url(#gridpattern)" stroke-width="0" d="M0 0h1e2v1e2H0z"/>
        </g>
    </g>
    <g>
        <title>ngv</title>
        <ellipse ry="11.7" rx="23.2" id="svg_33" cy="17.8" cx="52.2" stroke-width="1.5" stroke="#191919" fill="#fb0"/>
        <path id="svg_24" d="M64.3 90.3h3.1v4.1H64.3z" stroke-width="1.5" stroke="#191919" fill="#222"/>
        <path id="svg_3" d="M28.6 19.6h46.9v72H28.6z" stroke-width="1.5" stroke="#000" fill="#fd3"/>
        <path id="svg_6" d="M25.7 37h3v13.5H25.7z" stroke-width="1.5" stroke="#191919" fill="#333"/>
        <path id="svg_7" d="M25.7 70.8h3v13.5H25.7z" stroke-width="1.5" stroke="#191919" fill="#333"/>
        <path id="svg_8" d="M76 37h3v13.5H76z" stroke-width="1.5" stroke="#191919" fill="#333"/>
        <path id="svg_9" d="M76 70.6h3v13.5H75.8z" stroke-width="1.5" stroke="#191919" fill="#333"/>
        <path transform="rotate(-27.6, 35.3, 10.5)" id="svg_10" d="M29.4 9.3h11.8v2.3H29.4z" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="red"/>
        <path id="svg_19" d="M29.8 20.9h44.5v69.3H29.8z" fill-opacity="null" stroke="#fff" fill="none"/>
        <path id="svg_18" d="M31 22.4h41.7v66.7H31z" fill-opacity="null" stroke-width="2" stroke="#f22" fill="none"/>
        <path transform="rotate(23.8, 69, 10.3)" id="svg_11" d="M63.1 9.1h11.8v2.3H63.1z" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="red"/>
        <path transform="rotate(90, 52.159, 24.2897)" id="svg_14" d="M47.6 1.6h9.2v45.5H47.6z" stroke="#222" fill="url(#svg_36)"/>
        <path stroke-linecap="null" stroke-linejoin="null" id="svg_20" d="M41 48.1V80.1z" stroke="#ffa" fill="none"/>
        <path stroke-linecap="null" stroke-linejoin="null" id="svg_22" d="M52 48.1V80.1z" stroke="#ffa" fill="none"/>
        <path stroke-linecap="null" stroke-linejoin="null" id="svg_23" d="M64 48.1V80.1z" stroke="#ffa" fill="none"/>
        <path id="svg_12" d="M40.1 6.3h22.5v3H40z" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="#fff"/>
        <path id="carno_box" d="M35.9 42h32.6v24H35.9z" stroke-width="2" stroke="#191919" fill="{carnoBoxFill}"/>
        <text style="cursor:move" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="2em" id="carno" y="62%" x={carNoX} fill="#f9f9f9">{routeNumber}</text>
    </g>
</svg>
`;
export default NgvIcon;
