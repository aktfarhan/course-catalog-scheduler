// Classify section by suffix: Lab ('L'), Discussion ('D'), or Lecture (default)
export const getCategory = (sectionNumber: string) =>
    sectionNumber.endsWith('L') ? 'LAB' : sectionNumber.endsWith('D') ? 'DISC' : 'LEC';
