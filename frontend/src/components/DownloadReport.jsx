function DownloadReport() {

    const download = () => {

        window.open(

            "http://127.0.0.1:8000/report",

            "_blank"

        );

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <button

                onClick={download}

                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"

            >

                📥 Download AI Report

            </button>

        </div>

    );

}

export default DownloadReport;