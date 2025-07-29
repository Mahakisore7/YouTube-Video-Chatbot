    export async function getServerSideProps(url:string) {
      const res = await fetch('http://localhost:5678/webhook-test/841daeb6-14e0-4243-9e89-639f72820f16?url=' + encodeURIComponent(url));
      const data = await res.json();
      return data;
    }