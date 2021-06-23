// ローディング状態の受け渡しのためのHooks

import { useSelector } from "react-redux";

export const useLoadingState = () => {
  const loadingState = useSelector((state) => state.loading.status);
  return loadingState
}

export default useLoadingState;