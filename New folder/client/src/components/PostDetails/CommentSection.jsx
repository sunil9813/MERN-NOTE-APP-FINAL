import { Button, TextField, Typography } from "@material-ui/core"
import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { commentPost } from "../../actions/posts"
import useStyles from "./style"

export const CommentSection = ({ post }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState("")
  const user = JSON.parse(localStorage.getItem("profile"))
  const commentsRef = useRef()

  const handleComment = async () => {
    const finalComment = `${user.result.name} : ${comment}`

    const newComment = await dispatch(commentPost(finalComment, post._id))

    setComment("")
    setComments(newComment)
    // scroll down
    commentsRef.current.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
      <div>
        <div className={classes.comentsOuterContainer}>
          <div className={classes.comentsInnerContainer}>
            <Typography gutterBottom variant='h6'>
              Comments
            </Typography>
            {comments?.map((c, i) => (
              <Typography key={i} gutterBottom variant='subtitle1'>
                <strong> {c.split(": ")[0]}</strong>
                {c.split(":")[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
          {user?.result?.name && (
            <div style={{ width: "70%" }}>
              <Typography gutterBottom variant='h6'>
                Write a Comment
              </Typography>
              <TextField fullWidth rows={4} variant='outlined' label='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
              <Button style={{ marginTop: "10px" }} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleComment}>
                Comment
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
