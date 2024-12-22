import { BLOG_CATEGORY_ID, WORK_CATEGORY_ID } from "@/_constants/blog";
import { useDarkMode } from "@/_libs/darkmode";
import { FaConnectdevelop } from "react-icons/fa";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoIosMusicalNotes } from "react-icons/io";
import { GiButterfly } from "react-icons/gi";

type TabIconProps = {
  categoryId: string;
};

export default function TabIcon({ categoryId }: TabIconProps): JSX.Element | undefined {
  const { isDarkMode } = useDarkMode()

  if (categoryId === WORK_CATEGORY_ID[0]) {
    return <FaConnectdevelop color={`${isDarkMode ? "#fff" : "#000"}`} size={50} />
  } else if (categoryId === WORK_CATEGORY_ID[1]) {
    return <HiOutlinePaintBrush color={`${isDarkMode ? "#fff" : "#000"}`} size={50} />
  } else if (categoryId === WORK_CATEGORY_ID[2]) {
    return <IoIosMusicalNotes color={`${isDarkMode ? "#fff" : "#000"}`} size={50} />
  } else if(categoryId === BLOG_CATEGORY_ID[0]) {
    return <FaConnectdevelop color={`${isDarkMode ? "#fff" : "#000"}`} size={50} />
  } else if (categoryId === BLOG_CATEGORY_ID[1]) {
    return <HiOutlinePaintBrush color={`${isDarkMode ? "#fff" : "#000"}`} size={50} />
  } else if (categoryId === BLOG_CATEGORY_ID[2]) {
    return <GiButterfly color={`${isDarkMode ? "#fff" : "#000"}`} size={50} />
  }
}