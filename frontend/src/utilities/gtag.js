export const GA_TRACKING_ID = 'G-968L600ZDF';

export const pageview = (url, title, userId) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
    page_title: title,
    custom_map: { dimension1: 'user_id' },
    user_id: userId,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};