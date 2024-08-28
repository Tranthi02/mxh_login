document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://bandoso.vnptnghean.com.vn:9448/api/v1/TinTuc/GetByPaging?maQuanHuyen=9&pageNumber=1&pageSize=12&tukhoa=&loai=0&sort=1';
    const articlesContainer = document.getElementById('articles');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            dodulieu(data.Data.DuLieu);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function dodulieu(data) {
        articlesContainer.innerHTML = '';
        const limitedData = data.slice(0, 2);
        
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
    }
});
