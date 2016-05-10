import React from 'react';
import { Accounts } from 'meteor/std:accounts-ui';
import SmartContainers from "meteor/utilities:react-list-container";
const ListContainer = SmartContainers.ListContainer;

import Core from "meteor/nova:core";
const ModalTrigger = Core.ModalTrigger;
const Messages = Core.Messages;

const PeggCardPostsPage = ({document, currentUser}) => {

  ({CommentsList, CommentsNew, PostsItem, PostsCategories, SocialShare, Vote, PostsStats, HeadTags, AccountsForm} = Telescope.components);

  const post = document;
  const htmlBody = {__html: post.htmlBody};
  const openLinkStyles = {
    position: 'relative',
    top: '-3px',
    height: '1em'
  };
  const cardPreviewUrl = "http://pegg.us/" + post.cardId

  const fail = function (message) {
    Messages.flash(message, "error");
  }

  const publishCard = function () {
    if (post.categoriesArray.length != 1)
      return fail("There should be one and only one category")
    deck = post.categoriesArray[0].name
    gifIdPattern = /[\/-]([^\/?-]+)($|\?)/
    card = {
      question: post.title,
      deck: deck,
      choices: [
        {
          text: post.answer1,
          gifId: gifIdPattern.exec(post.gif1) ? gifIdPattern.exec(post.gif1)[1] : null
        },
        {
          text: post.answer2,
          gifId: gifIdPattern.exec(post.gif2) ? gifIdPattern.exec(post.gif2)[1] : null
        },
        {
          text: post.answer3,
          gifId: gifIdPattern.exec(post.gif3) ? gifIdPattern.exec(post.gif3)[1] : null
        },
        {
          text: post.answer4,
          gifId: gifIdPattern.exec(post.gif4) ? gifIdPattern.exec(post.gif4)[1] : null
        }
      ]
    }
    Meteor.call("parsePublishCard", card, (error, result) => {
      if (error) {
        console.log(error)
        Messages.flash(error.message, "error");
      } else {
        Meteor.call("posts.edit", post._id, {
          $set: { cardId: result.data.cardId }
        });
        Messages.flash("Card published!", "success");
      }
    });
  }

  return (
    <div className="post-page">

      <HeadTags url={Posts.getLink(post)} title={post.title} image={post.thumbnailUrl} />

      <PostsItem post={post}/>

      <div className="post-body">{post.answer1}  &nbsp;&nbsp;
        { post.gif1 ?
          <a href={post.gif1} target='_blank'><img src="http://i.stack.imgur.com/To3El.png" style={ openLinkStyles }/></a>
          : ''
        }
      </div>
      <div className="post-body">{post.answer2}  &nbsp;&nbsp;
        { post.gif2 ?
          <a href={post.gif2} target='_blank'><img src="http://i.stack.imgur.com/To3El.png" style={ openLinkStyles }/></a>
          : ''
          }
      </div>
      <div className="post-body">{post.answer3}  &nbsp;&nbsp;
        { post.gif3 ?
          <a href={post.gif3} target='_blank'><img src="http://i.stack.imgur.com/To3El.png" style={ openLinkStyles }/></a>
          : ''
          }
      </div>
      <div className="post-body">{post.answer4}  &nbsp;&nbsp;
        { post.gif4 ?
          <a href={post.gif4} target='_blank'><img src="http://i.stack.imgur.com/To3El.png" style={ openLinkStyles }/></a>
          : ''
          }
      </div>

      { currentUser.isAdmin ?
        <div className="post-body">
          <a href="#" onClick={publishCard}>Publish Card</a>
        </div>
        : null
      }
      <div className="post-body">
        <a href={ cardPreviewUrl }>{ post.cardId }</a>
      </div>

      {/*<SocialShare url={ Posts.getLink(post) } title={ post.title }/>*/}

      <div className="comments-thread">
        <h4 className="comments-thread-title">Comments</h4>
        <ListContainer 
          collection={Comments} 
          publication="comments.list" 
          selector={{postId: post._id}} 
          terms={{postId: post._id, view: "postComments"}} 
          limit={0}
          parentProperty="parentCommentId"
          joins={Comments.getJoins()}
          component={CommentsList}
        />

        { currentUser ?
          <div className="post-new-comment">
            <h4>New Comment:</h4>
            <CommentsNew type="comment" postId={post._id} />
          </div> :
          <div>
            <ModalTrigger size="small" component={<a>Please log in to comment</a>}>
              <AccountsForm/>
            </ModalTrigger>
          </div> }
      </div>

    </div>
  )
};

Telescope.components.PostsPage = PeggCardPostsPage;
