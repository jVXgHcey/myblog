import React from 'react'
import Layout from '@theme/Layout'
import CodeBlock from '@theme/CodeBlock'

import FriendCard from './_components/FriendCard'
import { Friends, type Friend } from '@site/data/friend'

import styles from './styles.module.css'

const TITLE = '西蒙的小站'
const DESCRIPTION = ''
const ADD_FRIEND_URL = ''

function FriendHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <h1>{TITLE}</h1>
      <p>{DESCRIPTION}</p>
      <div className={styles.siteInfo}>
        <CodeBlock language="jsx">
          {`{
            // 本站信息
            title: '西蒙的小站',
            description: '道阻且长，行则将至',
            avatar: ''
          }`}
        </CodeBlock>
      </div>
      <a
        className="button button--primary"
        href={ADD_FRIEND_URL}
        target="_blank"
        rel="noreferrer"
      >
        🔗 申请友链
      </a>
    </section>
  )
}

function FriendCards() {
  const friends = Friends
  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className="container">
        <ul className={styles.showcaseList}>
          {friends.map(friend => (
            <FriendCard key={friend.avatar} friend={friend} />
          ))}
        </ul>
      </div>
    </section>
  )
}

function FriendLink(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <FriendHeader />
        <FriendCards />
      </main>
    </Layout>
  )
}

export default FriendLink
