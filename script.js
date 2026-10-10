const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const resultContainer = document.getElementById('resultContainer');
const errorContainer = document.getElementById('errorContainer');
const loadingState = document.getElementById('loadingState');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');
const userBio = document.getElementById('userBio');

async function fetchGitHubUser() {
    const username = searchInput.value.trim();

    if (!username) return;

    resultContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    loadingState.classList.remove('hidden');
    loadingState.classList.add('flex');

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!response.ok) {
            throw new Error('Usuário não encontrado');
        }

        const data = await response.json();

        userAvatar.src = data.avatar_url;
        userName.textContent = data.name || data.login;
        userBio.textContent = data.bio || 'Este usuário não possui uma biografia cadastrada.';

        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('flex');
    } catch (error) {
        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        errorContainer.classList.remove('hidden');
        errorContainer.classList.add('block');
    }
}

searchButton.addEventListener('click', fetchGitHubUser);

searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        fetchGitHubUser();
    }
});
