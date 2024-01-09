const fileInput = document.querySelector("input"),
    downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
});

async function fetchFile(url) {
    try {
        const response = await fetch(url, { headers: { 'Range': 'bytes=0-' } });
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        const tempUrl = URL.createObjectURL(blob);

        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
    } catch (error) {
        console.error("Error fetching the file:", error);
        alert("Failed to download file!");
    } finally {
        downloadBtn.innerText = "Download File";
    }
}