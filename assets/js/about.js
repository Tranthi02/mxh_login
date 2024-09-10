$(document).ready(function () {
    const apiUrl = 'https://bandoso.vnptnghean.com.vn:9448/api/v1/TinTuc/GetByPaging?maQuanHuyen=9&pageNumber=1&pageSize=12&tukhoa=&loai=0&sort=1';
    const $articlesContainer = $('#articles');
    const $recentContainer = $('.posts');
    const $loadingElement = $('#loading');
    const $articleContent = $('.article-content');

    $loadingElement.css('display', 'flex');

    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (response) {
            dodulieu(response.Data.DuLieu);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', errorThrown);
        },
        complete: function () {
            setTimeout(function () {
                $loadingElement.addClass('fade-out');
                setTimeout(function () {
                    $loadingElement.css('display', 'none');
                    $articleContent.removeClass('hidden');
                }, 1000);
            }, 1000);
        }
    });

    function dodulieu(data) {
        $articlesContainer.empty();
        $recentContainer.empty();

        const limitedData = data.slice(0, 2);
        const recentPosts = data.slice(2, 8);

        limitedData.forEach(function (item) {
            const type = item.LOAI === 1 ? 'Tin tức' : 'Sự kiện';
            const articleHtml = `
                <div class="article">
                    <img src="${item.HINHANH}" alt="${item.ID_HINH_ANH}">
                    <i class="fa-solid fa-eye" aria-hidden="true"> ${item.LUOT_XEM}</i>
                    <div class="article-title">
                        <div class="text-article d-flex">
                            <span class="newss">${type}</span>
                            <span class="date"><i class="fa-regular fa-clock"></i> ${new Date(item.NGAY_TAO).toLocaleDateString()}</span>
                        </div>
                        <div class="chrome">
                            <a href="${item.TRICH_DAN}">${item.TIEU_DE}</a>
                        </div>
                        <p class="description">${item.MO_TA}</p>
                    </div>
                </div>
            `;
            $articlesContainer.append(articleHtml);
        });

        recentPosts.forEach(function (item) {
            const postHtml = `
                <div class="post">
                    <div class="post-images">
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
                </div>
            `;
            $recentContainer.append(postHtml);
        });
    }
});
