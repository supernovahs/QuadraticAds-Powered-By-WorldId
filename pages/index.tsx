import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { WidgetProps } from "@worldcoin/id";
import dynamic from "next/dynamic";

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
       
      </Head>

      <main className={styles.main}>
       

       

        {/* <p className={styles.description}>
        <WorldIDWidget
  actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
  signal="my_signal"
  enableTelemetry
  onSuccess={(verificationResponse) => console.log(verificationResponse)}
  onError={(error) => console.error(error)}
/>;
        </p> */}

        <div className={styles.grid}>
          
        </div>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
};

export default Home;
