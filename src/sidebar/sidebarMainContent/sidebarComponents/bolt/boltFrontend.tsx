import { useStorage } from "@plasmohq/storage/dist/hook";
import {regionArray, environmentArray} from "../componentArrays"

export default function BoltFrontendTab() {
  const [environment, setEnvironment] = useStorage("frontendEnvironment");
  const [region, setRegion] = useStorage("frontendRegion");

  function handleEnvChange(event) {
    setEnvironment(event.target.value);
  }

  function handleRegionChange(event) {
    setRegion(event.target.value);
  }

  return (
    <div className="frontendContainer">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Environment:</span>
        </label>
        <select onChange={handleEnvChange} value={environment} className="select select-sm select-bordered">
          {environmentArray().map(environmentArray => (
            <option key={environmentArray.Name} value={environmentArray.Code}>
              {environmentArray.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Region:</span>
        </label>
        <select onChange={handleRegionChange} value={region} className="select select-sm select-bordered">
          {regionArray.map(region => (
            <option key={region.Name} value={region.Code}>
              {region.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Navigate:</span>
        </label>
        <button className="btn btn-sm btn-primary">Go</button>
      </div>
    </div>
)
}