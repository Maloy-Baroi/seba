import Head from "next/head";

const OnlyHead = (props) => {
  return (
      <>
          <Head>
              <title>Seba Pharmacy | Seller | {props.page}</title>
          </Head>
      </>
  );
}

export default OnlyHead;
