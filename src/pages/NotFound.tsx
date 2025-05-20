export const NotFound = () => {
  return (
    <div className="pb-[60px]">
      <div className="bg-[#151515] w-full h-full flex flex-col items-center text-white">
        <div className="py-20">
          <img src="/404.png" alt="" className="max-h-[490px] w-auto" />
        </div>
        <div className="pt-[24px] px-[16px] py-[18px] text-center">
          <h2 className="text-[18px] font-bold">
            This page is not fully armed and operational.
          </h2>
          <p className="font-medium text-[21px] mt-[27px]">
            Try something else?
          </p>
        </div>
      </div>
    </div>
  );
};
