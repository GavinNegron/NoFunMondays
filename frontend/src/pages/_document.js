import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900&family=Libre+Franklin:wght@900&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@600;700;800;900&family=Ubuntu:wght@700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Outfit:wght@100..900&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5205794033914654" crossOrigin="anonymous"></script>
          <script defer src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `document.cookie = "humanCheck=true; max-age=3600; path=/";`,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
