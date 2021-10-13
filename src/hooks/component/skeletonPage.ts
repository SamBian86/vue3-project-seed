export default function useSkeletonPageComponent(skeletonPageRef: any) {

  // 显示占位
  function showSkeleton() {
    skeletonPageRef.value && skeletonPageRef.value.showSkeleton()
  }

  // 隐藏占位
  function hideSkeleton() {
    skeletonPageRef.value && skeletonPageRef.value.hideSkeleton()
  }

  return {
    showSkeleton,
    hideSkeleton,
  }
}