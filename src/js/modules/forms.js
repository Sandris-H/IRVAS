
import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll("form"),
    input = document.querySelectorAll("input");
    // phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    checkNumInputs('input[name="user_phone"]');
    // phoneInputs.forEach(item => {
    //     item.addEventListener('input', () => {
    //         item.value = item.value.replace(/\D/, '');
    //     })
    // });

  const message = {
    loading: "Loading",
    success: "Thank you. We will connect with you soon.",
    failure: "Something went wrong...",
  };

  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = () => {
    input.forEach(item => {
        item.value = "";
    });
  }

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      if(item.getAttribute('data-calc') === 'end'){
        for(let key in state){
            formData.append(key, state[key]);
        }
      }
      postData("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 5000);
        });
    });
  });
};

export default forms;
