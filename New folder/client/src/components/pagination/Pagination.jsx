import React from "react"
import { Pagination, PaginationItem } from "@material-ui/lab"
import useStyle from "./style"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "../../actions/posts"

export const Paginations = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts)
  const classes = useStyle()
  const dispatch = useDispatch()

  useEffect(() => {
    if (page) dispatch(getPosts(page))
  }, [page])
  return (
    <>
      <Pagination classes={{ ul: classes.ul }} count={numberOfPages} page={Number(page) || 1} variant='outline' color='primary' renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />} />
    </>
  )
}
