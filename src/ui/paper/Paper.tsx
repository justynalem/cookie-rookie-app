import { ReactNode } from "react";
import "./Paper.scss"

export const Paper = ({children}: {children: ReactNode}) => {
  return (
    <div className="paper">{children}</div>
  )
}
