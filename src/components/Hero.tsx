// Importing Widget Details
import widgetProps from "./widgetProps.json";

// *** IMPORTING WEB3 LIBRARIES ***

// ** SUPERFLUID LIBRARIES **

// 1. Import SuperFluid Tokens
import superTokenList from "@superfluid-finance/tokenlist";

// 2. Import SuperFluid Widget
import SuperfluidWidget, {
  EventListeners,
  supportedNetworks,
} from "@superfluid-finance/widget";

// 3. Import Web3Modal Library
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { useWeb3Modal, Web3Modal } from "@web3modal/react";

// 4. Import useMemo hook from react
import { useMemo } from "react";

// 5. Import Wagmi hooks
import { configureChains, createConfig, WagmiConfig } from "wagmi";

// Paste Your ProjectId here
const projectId = "85478f548038ad04dd9dbee3c3264d15";

// Web3Modal stuff
const { publicClient } = configureChains(supportedNetworks, [
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({
    projectId,
    chains: supportedNetworks,
  }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, supportedNetworks);

export const Hero = () => {
  const { open, isOpen } = useWeb3Modal();
  const walletManager = useMemo(
    () => ({
      open,
      isOpen,
    }),
    [open, isOpen]
  );

  const eventListeners: EventListeners = useMemo(
    () => ({
      onSuccess: () => console.log("onSuccess"),
      onSuccessButtonClick: () => console.log("onSuccessButtonClick"),
    }),
    [],
  );

  return (
    <div className="hero-container h-fit w-5/6 md:w-1/2">
      <div className="banner-container flex justify-center ">
        <img
          src="/images/banner.png"
          className="rounded-t-[40px]"
          alt="Banner Image"
        />
      </div>
      <div className="profile-photo-container flex justify-center relative bottom-[65px]">
        <img
          src="/images/profile-image-round.png"
          className="w-2/6 md:w-[150px] "
          alt=""
        />
      </div>

      <div className="information-container relative bottom-[65px]">
        <div className="flex justify-center">
          <h1 className="text-3xl font-logoTitle font-bold">
            Sebastian Mercer
          </h1>
        </div>
        <div className="flex justify-center font-semibold mt-2">
          <p className="text-slate-500">Music Producer</p>
        </div>
        <div className="flex justify-center mt-4">
          <WagmiConfig config={wagmiConfig}>
            <SuperfluidWidget className=""
              productDetails={widgetProps.productDetails}
              paymentDetails={widgetProps.paymentDetails}
              tokenList={superTokenList}
              type="dialog"
              theme={widgetProps.theme}
              walletManager={walletManager}
              eventListeners={eventListeners}
            >
              {({ openModal }) => (
                <button className="bg-transperant border-[0.5px] hover:bg-black hover:text-white border-black px-4 py-2 rounded-2xl text-xl" onClick={() => openModal()}>Subscribe</button>
              )}
            </SuperfluidWidget>
          </WagmiConfig>
          <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </div>
        <div className="social-media-handles flex justify-center mt-6">
          <img src="/images/instagram.png" className="w-6" alt="" />
          <img src="/images/youtube-icon.png" className="w-6 ml-4" alt="" />
          <img src="/images/twitch.png" className="w-6 ml-4" alt="" />
          <img src="/images/discord.png" className="w-6 ml-4" alt="" />
        </div>
      </div>
    </div>
  );
};