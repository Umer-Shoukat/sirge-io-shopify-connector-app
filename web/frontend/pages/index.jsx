import { Page, Layout, Frame, Spinner } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useAppQuery } from "../hooks";

import { ConnectCard } from "../components";
import Reviews from "../components/Reviews";
import { useState } from "react";

export default function HomePage() {

  const [isLoading, setIsLoading] = useState(true);
  
  const shopData = useAppQuery({
    url: "/api/shop",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  return (
    <Frame>
      <Page fullWidth>
        <TitleBar title="Sirge App" primaryAction={null} />
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "20px 0 10px 0" }}>
            <Spinner />
          </div>
        ) : (
          <Layout>
            <Layout.Section>
              <ConnectCard shopObjData={shopData.data[0]} />
              <Reviews />
            </Layout.Section>
          </Layout>
        )}
      </Page>
    </Frame>
  );
}
