import Brand from "./Brand";

const LoadingWidget = () => {
  return (
    <div className="w-full h-screen bg-[#FEFFFE] dark:bg-[#101010] text-[#101010]  dark:text-[#fff] flex items-center justify-center">
      {/* Brand must be large + add some animation to it */}
      <Brand />
    </div>
  );
};
export default LoadingWidget;
