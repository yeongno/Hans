import header from "./Header.module.css"
import Drop from "./Drop"
import San from "./San"


export default function Header(){
 return (
  <div className={header.body}>
    <San />
    <div className={header.home_header}>
      <div className={header.home_header_inner}>
        <div className={header.sub_menu}>
          <ul className={header.menu}>
            <li>
              <a href="/signin">Sign In</a>
            </li>
            <li>
              <a href="javascript:void(0)">My Page</a>
            </li>
            <li>
              <a href="javascript:void(0)">My Page2</a>
            </li>
            <li>
              <a href="javascript:void(0)">My Page3</a>
            </li>
          </ul>
          <div className={header.search}>
            <input type="text" />
            <div className={header.icon}></div>
          </div>
        </div>
        <Drop />
      </div>
    </div>
  </div>
  )
}


 