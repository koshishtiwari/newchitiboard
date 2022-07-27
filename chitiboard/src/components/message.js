
function Message({messages}) {

    return (
      <section className='message'>
        {messages &&
        <p>{messages}</p>}
      </section>
    );

  }
  
  export default Message;