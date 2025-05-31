// breadcrumb.js - Add this to your scripts
document.addEventListener('DOMContentLoaded', function () {
    function generateBreadcrumbs() {
        // Get current path and remove empty segments
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment !== '');

        // Start with Home
        let breadcrumbHTML = '<li class="breadcrumb-item"><a href="/">Home</a></li>';

        // Build intermediate paths
        let accumulatedPath = '';

        segments.forEach((segment, index) => {
            accumulatedPath += `/${segment}`;
            const isLast = index === segments.length - 1;
            const name = formatBreadcrumbName(segment);

            if (isLast) {
                // Current page (not a link)
                breadcrumbHTML += `<li class="breadcrumb-item active" aria-current="page">${name}</li>`;
            } else {
                // Intermediate page (link)
                breadcrumbHTML += `<li class="breadcrumb-item"><a href="${accumulatedPath}">${name}</a></li>`;
            }
        });

        // Update the DOM
        document.getElementById('dynamicBreadcrumb').innerHTML = breadcrumbHTML;
    }

    // Format URL segments into readable names
    function formatBreadcrumbName(segment) {
        // Remove .html or other file extensions
        const cleanSegment = segment.replace(/\.[^/.]+$/, '');

        return cleanSegment
            .replace(/-/g, ' ')        // Replace hyphens with spaces
            .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letters
    }

    // Generate breadcrumbs on page load
    generateBreadcrumbs();
});