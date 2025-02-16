const isBot = (userAgent) => {
    const botPatterns = [
      /bot/i,
      /spider/i,
      /crawl/i,
      /slurp/i,
      /mediapartners/i,
      /yandex/i,
      /baidu/i,
      /bingpreview/i,
      /duckduckbot/i,
      /facebot/i,
      /facebookexternalhit/i,
      /linkedinbot/i,
      /msnbot/i,
      /pingdom/i,
      /pinterest/i,
      /tumblr/i,
      /twitterbot/i,
      /yahoo/i,
      /embedly/i,
      /quora/i,
      /redditbot/i,
      /showyoubot/i,
      /outbrain/i,
      /semrush/i,
      /ahrefsbot/i,
      /mj12bot/i,
      /dotbot/i,
      /gigabot/i,
      /sogou/i,
      /exabot/i,
      /ia_archiver/i,
    ];
  
    return botPatterns.some((pattern) => pattern.test(userAgent));
  };
  
  module.exports = { isBot };