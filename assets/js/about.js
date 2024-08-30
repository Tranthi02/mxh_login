document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://bandoso.vnptnghean.com.vn:9448/api/v1/TinTuc/GetByPaging?maQuanHuyen=9&pageNumber=1&pageSize=12&tukhoa=&loai=0&sort=1';
    const articlesContainer = document.getElementById('articles');
    const recentContainer = document.querySelector('.posts');
    const loadingElement = document.getElementById('loading');
    const articleContent = document.querySelector('.article-content');

    loadingElement.style.display = 'flex';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dodulieu(data.Data.DuLieu);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            setTimeout(() => {
                loadingElement.classList.add('fade-out');
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                    articleContent.classList.remove('hidden'); 
                }, 1000);
            }, 1000);
        });

    function dodulieu(data) {
        articlesContainer.innerHTML = '';
        recentContainer.innerHTML = '';
        const limitedData = data.slice(0, 2);
        const recentPosts = data.slice(0, 6);

        limitedData.forEach(item => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');
            const type = item.LOAI === 1 ? 'Tin tức' : 'Sự kiện';

            articleDiv.innerHTML = `
                <img src="${item.HINHANH}" alt="${item.ID_HINH_ANH}">
                <i class="fa-solid fa-eye" aria-hidden="true"> ${item.LUOT_XEM}</i>
                <div class="article-title">
                    <div class="text-article d-flex">
                        <span class="news">${type}</span>
                        <span class="date"><i class="fa-regular fa-clock"></i> ${new Date(item.NGAY_TAO).toLocaleDateString()}</span>
                    </div>
                    <div class="chrome">
                        <a href="${item.TRICH_DAN}">${item.TIEU_DE}</a>
                    </div>
                    <p class="description">${item.MO_TA}</p>
                </div>
            `;
            articlesContainer.appendChild(articleDiv);
        });

        recentPosts.forEach(item => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            postDiv.innerHTML = `
                <div class = "post-images">
                    <img src="${item.HINHANH}" alt="${item.ID_HINH_ANH}">
                </div>
                <div class="post-info">
                    <div class="text-overlay d-flex">
                        <span class="languages web-design">${item.LOAI === 1 ? 'TIN TỨC' : 'TIN MỚI'}</span>
                        <span class="date-time"><i class="fa-regular fa-clock"></i> ${new Date(item.NGAY_TAO).toLocaleDateString()}</span>
                    </div>
                    <div class="website">
                        <a href="${item.TRICH_DAN}">${item.TIEU_DE}</a>
                    </div>
                </div>
            `;
            recentContainer.appendChild(postDiv);
        });
    }
});
