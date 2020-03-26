export function getRouteColor(rid) {
  switch (rid) {
    case '1a':
      return 'yellow';
    case '1b':
      return 'blue';
    case '2':
      return '#ff69b4';
    case '3':
      return 'darkorange';
    case '4':
      return 'green';
    case '5':
      return 'red';
    default:
      return '#222';
  }
}

export function getDirectionRouteColor(rid) {
  switch (rid) {
    case 'ngv-1a':
      return 'yellow';
    case 'ngv-1b':
      return 'blue';
    case 'ngv-2':
      return '#ff69b4';
    case 'ngv-3':
      return 'darkorange';
    case 'ngv-4':
      return 'green';
    case 'ngv-5':
      return 'red';
    default:
      return '#888';
  }
}

export function getZoomScale(zoomLevel) {
  return Math.pow(2, zoomLevel) / 65536;
}

export function getInitZoom(width) {
  if (width < 400) {
    return 14.2;
  } else if (width < 768) {
    return 14.4;
  } else if (width < 1024) {
    return 15.3;
  } else if (width < 1440) {
    return 15.7;
  } else {
    return 16.4;
  }
}
