import { CreateContextProvider } from "context/CreateContext";
import { CreateNftDetailsContextProvider } from "context/CreateNftDetailsContext";

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

export default function CreateNftContextProvider(props: ProviderProps) {
  return (
    <CreateNftDetailsContextProvider>
      <CreateContextProvider>{props.children}</CreateContextProvider>
    </CreateNftDetailsContextProvider>
  );
}
