import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ubuntu:wght@700;800&family=Libre+Franklin:wght@900&display=swap"></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap"></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@600;700;800;900&family=Ubuntu:wght@700&display=swap"></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap" />
            <link rel="icon" href="/image/placeholder.png" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5205794033914654" crossorigin="anonymous"/>
        <Script defer src="https://code.jquery.com/jquery-3.7.1.min.js" type="module"></Script>
        <Script async src="https://kit.fontawesome.com/5ee52856b3.js" crossOrigin="anonymous"></Script>
        {process.env.NODE_ENV === "production" && (
          <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-968L600ZDF"/>
          <Script async strategy="afterInteractive" id="analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-968L600ZDF');
            `}
          </Script>
        </>
        )}
      </Html>
    )
  }
}

export default MyDocument
