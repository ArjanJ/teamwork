import posed from 'react-pose';

export const PoseListStaggerList = posed.ul({
  visible: {
    delayChildren: 600,
    staggerChildren: 50,
  },
});

export const PoseListStaggerListItem = posed.li({
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
});
