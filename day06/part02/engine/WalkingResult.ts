import BreadCrumb from "./BreadCrumb";

interface WalkingResult {
    steps: number;
    inLoop: boolean;
    breadcrumb: BreadCrumb;
}

export default WalkingResult;