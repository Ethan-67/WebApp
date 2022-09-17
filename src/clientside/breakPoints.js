const breakPoints = {
    mobile: 576, 
    tablet: 768
}

export const getBreakPoint = (windowWidth) => {
    if (windowWidth < breakPoints.mobile) {
        return 'mobile'
    }
    else if (windowWidth > breakPoints.mobile && windowWidth < breakPoints.tablet) {
        return 'tablet' 
    }
    else {
        return 'desktop' 
    }
}
