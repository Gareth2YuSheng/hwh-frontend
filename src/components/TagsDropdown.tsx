import { useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import FilterListIcon from '@mui/icons-material/FilterList';
//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Props {
  selectTagFn: (s:string) => void;
  forFilter: boolean;
  openModalFn?: () => void;
}

export default function TagsDropdown({ selectTagFn, forFilter, openModalFn } : Props) {
  const { tags, isLoading } = useSelector((state : RootState) => state.tag);

  const [selectedTag, setSelectedTag] = useState("");

  //Do not fetch tags here, tags will be fetched 
  //by the component that uses this dropdown component

  const handleRemoveTagFilter = () => {
    setSelectedTag("");
    selectTagFn("");
  };

  // if (isLoading) {
  //   return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
  //     <Spinner animation="border" />
  //   </div>;
  // }

  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {forFilter ? <>
          <FilterListIcon className="" />
          {selectedTag == "" ? "Filter By Tag" : "Filtered By: " + selectedTag}
        </> : <>
          {selectedTag == "" ? "Add Tag" : "Selected Tag: " + selectedTag}
        </>}
        
      </Dropdown.Toggle>
      
      <Dropdown.Menu>
        {isLoading && <div className="d-flex justify-content-center align-items-center" style={{ height: "50px" }}><Spinner animation="border" /></div> }
        {selectedTag != "" && forFilter &&
          <Dropdown.Item onClick={handleRemoveTagFilter}>Remove Filter</Dropdown.Item>}
        {tags.length > 0 && tags.map((tag, index) => {
          return <Dropdown.Item key={tag.tagId} onClick={() => {
            console.log("Tag:",tag.tagId,"|",tag.name);
            selectTagFn(tag.tagId);
            setSelectedTag(tag.name);
          }}>{tag.name}</Dropdown.Item>;
        })} 
        {tags.length <= 0 && !isLoading && <Dropdown.Item disabled>No Tags Found</Dropdown.Item>}
        {!forFilter && <>
          <Dropdown.Divider />
          <Dropdown.Item onClick={openModalFn}>Create New Tag</Dropdown.Item>
        </>}
      </Dropdown.Menu>
    </Dropdown>
  );
};
