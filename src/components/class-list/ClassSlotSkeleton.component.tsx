import Skeleton from "react-loading-skeleton";

function ClassSlotSkeleton() {
  return (
    <div className="my-4 grid grid-cols-4 justify-around border-2 border-[#4167cd]/30 rounded-[32px] p-4">
      <div className="flex justify-center items-center">
        <Skeleton circle height={80} width={80} baseColor="rgb(65 103 205 / 0.3)" highlightColor="rgb(65 103 205 / 0.2)" />
      </div>

      <div className="col-span-2 space-y-2">
        <Skeleton height={20} width="60%" baseColor="rgb(65 103 205 / 0.3)" highlightColor="rgb(65 103 205 / 0.2)"/>
        <Skeleton height={16} width="40%" baseColor="rgb(65 103 205 / 0.3)" highlightColor="rgb(65 103 205 / 0.2)" />
        <Skeleton height={16} baseColor="rgb(65 103 205 / 0.3)" highlightColor="rgb(65 103 205 / 0.4)" />
        <div className="flex justify-between">
          <Skeleton height={16} width="40%" baseColor="rgb(65 103 205 / 0.3)" highlightColor="rgb(65 103 205 / 0.2)" />
          <Skeleton height={16} width="30%" baseColor="rgb(65 103 205 / 0.3)" highlightColor="rgb(65 103 205 / 0.2)" />
        </div>
      </div>
    </div>
  );
}

export default ClassSlotSkeleton;
