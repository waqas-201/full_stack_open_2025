<>
  {anecdotes.anecdote
    ?.sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote?.id}>
        <div>{anecdote?.content}</div>
        <div>
          has {anecdote?.votes}
          <button onClick={() => vote(anecdote?.id)}>vote</button>
        </div>
      </div>
    ))}
</>;
