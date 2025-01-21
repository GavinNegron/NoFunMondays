import Document, { Html, Head, Main, NextScript } from 'next/document'

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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
