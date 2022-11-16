import {
  Card,
  Button,
  DisplayText,
  TextContainer,
  Toast,
  Spinner,
} from "@shopify/polaris";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { API_END_POINT, APP_NAME, CONNECT_END_POINT } from "../config";
import { Modal } from "@shopify/app-bridge-react";
import { useNavigate } from "@shopify/app-bridge-react";
import createApp from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";
export const ConnectCard = ({ shopObjData }) => {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [businessState, setBusinessState] = useState({});
  const [showConnect, setShowConnect] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const checkBusiness = async () => {
    try {
      setIsLoading(true);
      const resp = await axiosInstance.get(
        `/s/store/lookup?shop=https://${shopObjData?.session?.shop}`
      );

      const data = resp.data;

      if (data.success === false) {
        setShowConnect(true);
        setToastProps({ content: data.message });
      } else {
        setShowConnect(false);
        setToastProps({ content: data.message });
      }
      setBusinessState(data);
    } catch (err) {
      setShowConnect(true);
      setToastProps({ content: err.response.data.message });
    } finally {
      setIsLoading(false);
    }
  };

  const addScript = async () => {
    try {
      setIsLoading(true);
      const resp = await axiosInstance.post(
        `/${businessState.business_id}/shopify/script`
      );

      const data = resp.data;

      setToastProps({ content: data.success });
    } catch (err) {
      setToastProps({ content: err.response.data.message });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteScript = async () => {
    try {
      const resp = await fetch(
        `${API_END_POINT}/${businessState.business_id}/shopify/script`,
        {
          method: "DELETE",
          headers: {
            Key: "6rt9876fgDRD@DJHDFUY@",
          },
        }
      );
      const data = await resp.json();
      setToastProps({ content: data.success });
    } catch (err) {
      setToastProps({ content: err.response.data.message });
    }
  };

  const dissconnectScript = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/${businessState.business_id}/s/script`);
      const resp = await axiosInstance.delete(
        `/${businessState.business_id}/s/disconnect`
      );
      const data = resp.data;
      setToastProps({ content: data.success });
    } catch (err) {
      setToastProps({ content: err.error });
    } finally {
      setShowConnect(true);
      setIsLoading(false);
    }
  };
  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleConnect = () => {
    navigate(
      `${CONNECT_END_POINT}settings/s/select-business?shop=https://${shopObjData?.session?.shop}&token=${shopObjData?.session?.accessToken}&redirect_url=https://${shopObjData?.session?.shop}/admin/apps/${APP_NAME}/`
    );
  };

  useEffect(() => {
    checkBusiness();
  }, []);
  return (
    <>
      {toastMarkup}
      <Card sectioned>
        {showConnect ? (
          <>
            <DisplayText element="h2" size="small">
              Connect to Sirge Install Wizard
            </DisplayText>
            <TextContainer spacing="loose">
              <p>
                To connect to the Sirge Install Wizard, please click the Connect
                button
              </p>
            </TextContainer>
          </>
        ) : (
          <>
            <DisplayText element="h2" size="small">
              Sirge Install Wizard is successfully connected to your Shopify
              store
            </DisplayText>
            <TextContainer spacing="loose">
              <p>
                To disconnect to the Sirge Install Wizard, please click the
                Disconnect button
              </p>
            </TextContainer>
          </>
        )}
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "20px 0 10px 0" }}>
            <Spinner />
          </div>
        ) : (
          <>
            {showConnect && (
              <div style={{ textAlign: "center", margin: "20px 0 10px 0" }}>
                {/* <a
                  target="_self"
                  href={`${CONNECT_END_POINT}settings/s/select-business?shop=https://${shopObjData?.session?.shop}&token=${shopObjData?.session?.accessToken}&redirect_url=https://${shopObjData?.session?.shop}/admin/apps/${APP_NAME}/`}
                  className="connectBtn"
                >
                  Connect
                </a> */}
                 <button className="connectBtn" onClick={handleConnect}>
                  Connect
                </button>
              </div>
            )}

            {!showConnect && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button id="disconnectBtn" onClick={dissconnectScript}>
                  Disconnect
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        message="URL Modal"
        primaryAction={{
          url: "https://www.google.com/",
          target: "APP",
          content: "URL",
        }}
      />
    </>
  );
};
