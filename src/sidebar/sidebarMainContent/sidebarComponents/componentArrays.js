export {}
export const regionArray = [
  {Code: 'com', Name: "UK", Jenkins: 'build-gb'},
  {Code: "us", Name: "US", Jenkins: 'build-us'}
];

export const jenkinsJobsArray = [
  {Job: 'planner3d-gameci-native', Name: "Planner3D Mac", Modfier:' '},
  {Job: "planner3d-gameci-native-windows", Name: "Planner3D Win", Modfier:' '},
  {Job: "planner3d-assets-gameci", Name: "Planner3D Assets", Modfier:' '},
  {Job: "planner3d-light-atlasser-vr2", Name: "Planner3D Light Atlasser", Modfier:' '},
  {Job: "wrender-gameci-test", Name: "Planner3D HQ", Modfier:' '},
  {Job: "selenium-end-to-end-tests", Name: "Selenium Tests", Modfier:'build?delay=0sec'},
  {Job: "planner2d", Name: "Planner2D", Modfier:' '},
  {Job: "frontend", Name: "Frontend", Modfier:' '},
  {Job: "feeder", Name: "Feeder", Modfier:' '},
];

export function environmentArray() {
  //setup arrays first, then they can be used for initial values.
  const environmentArray = Array(9).fill( 9).map((_, i) => {
    return {Code: `project${i}.`, Name: `Project ${i}`, Jenkins: `project${i}`}
  })
  // Append Live into the array at the beginning.
  environmentArray.unshift({Code: ' ', Name: "Live", Jenkins: "master"})}